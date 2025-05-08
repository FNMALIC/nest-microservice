import * as nodemailer from 'nodemailer';
import * as exphbs from 'express-handlebars';

interface MailData {
  email?: string;
  EMAIL?: string;
  emailsSubject?: string;
  html?: string;
  startDate?: Date;
  endDate?: Date;
  code?: string;
  [key: string]: any;
}
// const configService = new ConfigService(); // You may want to pass in the Nest `ConfigService` if you're in a Nest context
const mailConfig = {
  host: 'smtp.office365.com',
  port: 587,
  auth: {
    user: 'galio.noreply@myiuc.com',
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true
  },
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 5,
};

// Transporter singleton
let transporter: nodemailer.Transporter | null = null;

const getTransporter = (): nodemailer.Transporter => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      auth: {
        user: 'galio.noreply@myiuc.com',
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true
      },
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
    });
  }
  return transporter;
};

// Initialize Handlebars
const hbs = exphbs.create({
  layoutsDir: 'views',
});

// Core mail sending function with retries
const sendMail = async (
  option: nodemailer.SendMailOptions,
  maxRetries = 3,
  retryDelay = 1000,
): Promise<string> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const mailer = getTransporter();

      await mailer.verify();
      const info = await mailer.sendMail(option);

      if (!info.messageId) {
        throw new Error('No messageId received from mail server');
      }

      console.log(
        `Email sent successfully on attempt ${attempt}: ${info.messageId}`,
      );
      return info.messageId;
    } catch (error) {
      lastError = error as Error;
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt < maxRetries) {
        console.log(`Retrying in ${retryDelay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        retryDelay *= 2;
      }
    }
  }

  throw new Error(
    `Failed to send email after ${maxRetries} attempts. Last error: ${lastError?.message}`,
  );
};

// Template rendering helper
const renderTemplate = async (template: string, data: any): Promise<string> => {
  try {
    return await hbs.render(template, data);
  } catch (error) {
    console.error(`Template rendering failed for ${template}:`, error);
    throw new Error(`Template rendering failed: ${error.message}`);
  }
};

// Main Mail class
export class Mail {
  static welcomeEmail = async (data) => {
    return sendMail({
      from: process.env.MAIL_USER,
      to: data.email,
      subject: data.emailsSubject,
      html: await hbs.render('views/welcome-email.hbs', {
        ...data,
        redirectUrl: process.env.ROOT,
      }),
    });
  };

  static orderTransactionMail = async (data) => {
    const ordeDate = new Date(data.transactionDate).toDateString();
    return sendMail({
      from: process.env.MAIL_USER,
      to: data.email,
      subject: "PAIEMENT DE FRAIS D'ADMISSION POUR CONCOURS IUC",
      html: await hbs.render('views/order-transaction-email.hbs', {
        ...data,
        ordeDate,
      }),
    });
  };

  static async notify(data: MailData): Promise<string> {
    try {
      const html = await renderTemplate('views/notify.hbs', data);
      return sendMail({
        from: mailConfig.auth.user,
        to: data.email,
        subject: 'Mail pour les inscrits dans Academy/Galio, pour validation',
        html,
      });
    } catch (error) {
      console.error('Notification email failed:', error);
      throw error;
    }
  }

  static async planning(data: MailData): Promise<string> {
    try {
      return sendMail({
        from: mailConfig.auth.user,
        to: data.email,
        subject: `PLANNING WEEK FROM ${data.startDate?.toDateString()} ${data.endDate?.toDateString()}`,
        html: data.html || '',
      });
    } catch (error) {
      console.error('Planning email failed:', error);
      throw error;
    }
  }

  static async birthdayEmail(data: MailData): Promise<string> {
    try {
      const html = await renderTemplate('views/birthday.hbs', data);
      return sendMail({
        from: mailConfig.auth.user,
        to: data.EMAIL,
        subject: '🎂 Joyeux anniversaire, cher collaborateur !',
        html,
      });
    } catch (error) {
      console.error('Birthday email failed:', error);
      throw error;
    }
  }

  static contactSupport = async (data) => {
    return sendMail({
      from: process.env.MAIL_USER,
      to: 'numerique.educatif@myiuc.com',
      subject: 'ACCOUNT PROBLEM ALERT / ALERTE DE PROBLEME DE COMPTE',
      html: await hbs.render('views/contact-us.hbs', data),
    });
  };
  static closedRequest = async (request, employee) => {
    return sendMail({
      from: process.env.MAIL_USER,
      to: employee.EMAIL,
      subject: 'REQUEST DECISION ALERT / ALERTE DE DECISION SUR VOTRE REQUETE',
      html: await hbs.render('views/closed-request.hbs', {
        employee,
        request,
      }),
    });
  };
  static contactEmployee = async (data) => {
    return sendMail({
      from: process.env.MAIL_USER,
      to: data.EMAIL,
      subject: 'MESSAGE INFORMATION',
      html: await hbs.render('views/contact-employee.hbs', data),
    });
  };
  static emailAuth = async (data) => {
    console.log(`${process.env.ROOT_STU}session-type`);
    return sendMail({
      from: process.env.MAIL_USER,
      to: data.email,
      subject: "BIENVENUE SUR LA PLATEFORME D'ADMISSION DE IUC",

      html: await hbs.render('views/email-auth.hbs', {
        ...data,
        redirectUrl: `${process.env.ROOT_STU}session-type`,
      }),
    });
  };
  static reportTaskInfo = async (data) => {
    console.log(process.env.MAIL_USER, process.env.EMAIL_GROUP, process.env.MAIL_PASSWORD)
    return sendMail({
      from: process.env.MAIL_USER,
      to: process.env.EMAIL_GROUP,
      subject: data.TASK_NAME || 'CRON REPORT MESSAGE',
      html: await hbs.render('views/cron-task-report.hbs', data),
    });
  };
  static codeEmail = async (data, code) => {
    const currentDate = new Date().toISOString();
    return sendMail({
      from: process.env.MAIL_USER,
      to: data.EMAIL,
      subject: `CONFIRM ACCESS CODE: ${code} || CONFIRMATION DU CODE D'ACCES: ${code}`,
      html: await hbs.render('views/code-email.hbs', {
        ...data,
        code,
        currentDate,
      }),
    });
  };
  static closeConfirmationEmail = async (data) => {
    return sendMail({
      from: process.env.MAIL_USER,
      to: data.EMAIL,
      subject: 'Mail de confirmation pour la phase une',
      html: await hbs.render('views/close-confirmation-email.hbs', data),
    });
  };
  static activationToCourse = async (data) => {
    return sendMail({
      from: process.env.MAIL_USER,
      to: data.EMAIL,
      subject: 'ACTIVATION OF COURSE CHOICE||ACTIVATION DE CHOIX DE COURS',
      html: await hbs.render('views/activation-to-course.hbs', data),
    });
  };
  static closeCoursesChoices = async (data, employee) => {
    return sendMail({
      from: process.env.MAIL_USER,
      to: employee.EMAIL,
      subject: 'CHOICES SESSION CLOSURE||CLÔTURE DE SESSION DE CHOIX',
      html: await hbs.render('views/close-courses-choices.hbs', data),
    });
  };
}

// Utility functions
export const checkMailService = async (): Promise<boolean> => {
  try {
    const mailer = getTransporter();
    await mailer.verify();
    return true;
  } catch (error) {
    console.error('Mail service health check failed:', error);
    return false;
  }
};

export const resetMailTransporter = (): void => {
  if (transporter) {
    transporter.close();
    transporter = null;
  }
};
