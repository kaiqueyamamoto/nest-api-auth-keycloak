import { Injectable } from '@nestjs/common';
import { generate } from 'generate-password';
import axios from 'axios';
import { setApiKey, send } from '@sendgrid/mail';
import KcAdminClient from '@keycloak/keycloak-admin-client';

@Injectable()
export class PasswordRecoveryService {
  private adminClient = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE,
    realmName: process.env.KEYCLOAK_REALM_NAME,
  });

  /**
   * 1 - Generate Password
   * 2 - Check if the user exists
   * 3 - Update password within keycloak
   * 4 - Send the email to the user with the password
   */
  async forgotPassword(data) {
    // 1 - Generate Password
    console.log('-> New password generated');
    const newPassword = generate({
      length: 10,
      numbers: true,
    });

    // 2 - Check if the user exists
    console.log('-> Password Generation Process');
    const user = await axios.post(process.env.MS_USER + 'search/email', {
      email_search: data.email,
    });

    if (user.data.length == 0) {
      return { error: 0, message: 'email not found' };
    }

    // 3 - Update password within keycloak
    // Authentication
    console.log('-> Authenticating within the keycloak API');
    await this.adminClient.auth({
      username: `${process.env.KEYCLOAK_USER_MASTER}`,
      password: `${process.env.KEYCLOAK_PASS_MASTER}`,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
    });

    // Search by user
    try {
      console.log('-> Updating password within keycloak');
      await this.adminClient.users.update(
        {
          id: user.data[0].id,
          realm: process.env.KEYCLOAK_REALM_NAME,
        },
        {
          credentials: [
            {
              type: 'password',
              value: newPassword,
              temporary: false,
            },
          ],
        },
      );
    } catch (e) {
      return { error: 1, message: 'User not found keycloak' };
    }

    // 4 - Send the email to the user with the password
    console.log('-> Authenticating within the sendgrid API');
    setApiKey(process.env.SEND_GRID_API);

    // Debug Sendgrid
    const firstName = user.data[0].first_name;
    const password = newPassword;
    const email = user.data[0].email;
    try {
      console.log('-> Sending the email via the sendgrid API');
      await send({
        to: user.data[0].email,
        from: process.env.WIVO_EMAIL,
        subject: `Wivo`,
        templateId: process.env.EMAIL_TEMPLATE_NEW_PASSWORD,
        dynamicTemplateData: {
          user: {
            profile: { password, email, firstName },
          },
        },
      });
      console.log('-> Email successfully sent');
      return { success: true };
    } catch (e) {
      throw e;
    }
  }
}
