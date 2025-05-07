import nodemailer from 'nodemailer';

const Transporter = ({ user, pass }) => {
  return nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: { user, pass },
    tls: { ciphers: 'SSLv3' },
  });
};

const galio = {
  user: 'galio.noreply@myiuc.com',
  pass: 'U5/_2304@@g@l!0-2023=',
};

export default Transporter(galio);
