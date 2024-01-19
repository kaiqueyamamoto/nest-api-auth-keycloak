import KcAdminClient from '@keycloak/keycloak-admin-client';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as faker from 'faker';
import axios from 'axios';
import { Twilio } from 'twilio';
import sgMail from '@sendgrid/mail';
import twilio from 'twilio';

const wivo_email = ' ';
const twilio_secret = process.env.TWILIO_SECRET;

@Injectable()
export class ActivationService {
  private adminClient = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE,
    realmName: process.env.KEYCLOAK_REALM_NAME,
  });

  /**
   * Function to generate the sms code
   */
  randomizeInteger = (min: number, max: number) => {
    if (max == null) {
      max = min == null ? Number.MAX_SAFE_INTEGER : min;
      min = 0;
    }
    min = Math.ceil(min); // inclusive min
    max = Math.floor(max); // exclusive max
    if (min > max - 1) {
      throw new Error('Incorrect arguments.');
    }
    return min + Math.floor((max - min) * Math.random());
  };

  generateCode() {
    return this.randomizeInteger(100000, 999999).toString();
  }

  getMock() {
    return { message: 'This route works with POST' };
  }

  postMock(data) {
    const { email } = data;
    try {
      if (email != null) {
        return {
          sucess:
            'Seu codigo de verificaçao de email chegara em alguns segundos, verifique seu email',
        };
      }
      throw new Error();
    } catch (e) {
      return { message: 'Check the information submitted within the POST' };
    }
  }

  smsResend(data) {
    const { phone } = data;
    try {
      if (phone != null) {
        return {
          sucess:
            'Seu codigo de verificaçao de sms chegara em alguns segundos, verifique seu celular',
        };
      }
      throw new Error();
    } catch (e) {
      return { message: 'Check the information submitted within the POST' };
    }
  }

  postCallbackMock(data) {
    const { code } = data;
    try {
      if (code != null) {
        return {
          avatar: null,
          anonymous_id: null,
          email: faker.internet.email(),
          oauth_provider: null,
          status: 'active',
          display_name: faker.name.findName(),
          phone: '11974406508',
          user_id: uuidv4(),
          company: {},
        };
      }
      throw new Error();
    } catch (e) {
      return { message: 'Check the information submitted within the POST' };
    }
  }

  // User code verification and status information update
  async smsActivate(data) {
    const { code, uuid } = data;
    const search = await axios.post(process.env.MS_USER + 'get', { uuid });
    if (search.data[0].phone_status == code) {
      await axios.post(process.env.MS_USER + 'update/user/status', {
        uuid,
        status: 'active',
      });
      return { success: true };
    } else {
      return { error: 0, message: 'Invalid code' };
    }
  }

  emailActivate(data) {
    return { success: true };
  }

  // Send SMS
  async sendActivePhone(data) {
    try {
      // UUID
      const user = data.uuid;

      // Phone
      const phone = data.phone;

      // Generate code
      if (!user) {
        return 'You must be logged';
      }
      if (!phone) {
        return 'You must have a registered number to activate it.';
      }

      // Code
      const code = this.generateCode();
      await axios.post(process.env.MS_USER + 'update/phone', {
        code: code,
        uuid: user,
      });
      const to = phone;

      // Authentication within twilio
      const twilio = new Twilio(
        process.env.TWILIO_SID,
        process.env.TWILIO_AUTHTOKEN,
      );
      const res = await twilio.messages.create({
        body: `Ola, seu codigo de validaçao na WIVO é ${code}`,
        from: process.env.WIVO_PHONE,
        to,
      });

      // Debug send SMS Code
      console.log('-> Debug send SMS Code');
      console.log(res);
      console.log('======================');

      // Return for Front
      return {
        sucess:
          'Your phone verification code will arrive in a few seconds, check your phone',
      };
    } catch (e) {
      console.log(e);
      console.log(e.message);
      return { message: 'Check the information submitted within the PHONE' };
    }
  }
}
