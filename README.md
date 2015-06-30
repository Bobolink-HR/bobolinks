 
Description: 
Bobolinks is a moderator application.  Users can

Schema: 
Refer to this google doc: https://docs.google.com/spreadsheets/d/1tE6KMQvAvV81XmzEPj4C0pp7wC3DxonYvbPeRMGoNKk/edit#gid=163240481

Gulp:
In terminal, run gulp to minify CSS and JS files (make sure to npm install first :-) ).  We left the other JS files commented out in case you want to uncomment.  If any libraries or js files are added outside of lib, make sure to add it to the gulp file.  Prior to production, you may want to use the unminified versions of js files so you can take advantage of ionic serve.


Requested Feature List:

- Polling functionality: enable moderator to ask the audience poll questions and visualize the data that comes in in real time
  - multiple choice, true or false, etc.
- Improve/unify design across the board
- Build out desktop version
- Enable people to submit questions to the forum via text message (Twilio API)
- Enable people to submit questions via email
- Integrate with google calendar
- Improve functionality of emailing forum information to people
- Create custom shorter forum keys (instead of using the forum id as the key)
- Submit to app store

