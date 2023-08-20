import {bind, BindingScope} from '@loopback/core';
import {createTransport, SentMessageInfo} from 'nodemailer';

@bind({scope: BindingScope.TRANSIENT})
export class EmailService {
  /**
   * If using gmail see https://nodemailer.com/usage/using-gmail/
   */
  private static async setupTransporter() {
    return createTransport({
      host: 'wp12106981.mailout.server-he.de',
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: 'wp12106981-savapps',
        pass: 'BCS!2021',
      },
    });
  }
  async sendEmail(): Promise<SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const template = {
      from: '',
      to: '',
      subject: '',
      html: '',
      replyTo: '',
    };
    return transporter.sendMail(template);
  }
}
