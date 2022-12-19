import mailchimp_marketing as MailchimpMarketing
from mailchimp_marketing.api_client import ApiClientError
import json

def mailchimp_c():
        mailchimp = MailchimpMarketing.Client()
        mailchimp.set_config({
            "api_key": "6041ec6b06402130e6ccc1d707cd895f-us20",
            "server": "us20"
        })
        return mailchimp

class Mailchimp:

    def create_contact(self):
        list_id = "32ec5229b8"
        data = dict()
        data['email'] = 'robeddrts@themetromaxgropup.com'
        data['status'] = 'subscribed'
        data['address'] = 'NY'
        data['dot'] = 12512312
        data['mc_number'] = 2182354
        data['city'] = 'satna'
        data['state'] = 'MP'
        data['country'] = 'India'
        data['phone'] = '(706) 651-0444'
        data['name'] = 'vk'
        data['zip'] = 1231234

        print('data: ', data)

        print(data.get('phone'))

        member_info = {
            "email_address": data.get('email'),
            "status": "subscribed",

            "merge_fields": {
                "NAME": data.get('name'),
                "DOT":str(data.get('dot')),
                "PHONE":data.get('phone'),
                'ADDRESS':data.get('address'),
                'ZIP':data.get('zip'),
                'COUNTRY':data.get('country'),
                'STATE':data.get('state'),
                'CITY':data.get('city'),
                'MC':data.get('mc_number')
            }
        }

        try:
            mailchimp = mailchimp_c()
            response = mailchimp.lists.add_list_member(list_id, member_info)
            print("response: {}".format(response))
            return
        except ApiClientError as error:
            print("An exception occurred: {}".format(error.text))
            return

v = Mailchimp()
v.create_contact()