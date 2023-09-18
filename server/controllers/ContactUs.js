const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");

const adminEmail = process.env.ADMIN_EMAIL

exports.contactusEndpoint = async (req, res) => {
  console.log(req.body)
  try {
    const {
      countrycode,
      email,
      firstName,
      lastName,
      message,
      phoneNo
    } = req.body;

    // client res;
    const clientEmailResponse = await mailSender(
      email,
      "Inquire Mail For Study-Notion Random Visitor OR Client GETTING MAIL",
      contactUsEmail(
        email,
        firstName,
        lastName,
        message,
        phoneNo,
        countrycode,
      )
    );

    const adminMailResponse = await mailSender(
      adminEmail,
      "Study-Notion Enquiry Mail ADMIN GETTING MAIL",
      contactUsEmail(
        adminEmail,
        firstName,
        lastName,
        message,
        phoneNo,
        countrycode,
      )
    );

    if(!adminMailResponse || !clientEmailResponse) {
      return res.status(402).json({
        success: false,
        message: "Email Send Failed...",
      })
    }

    // console.log("adminMailResponse-->", adminMailResponse)
    // console.log("clientEmailResponse-->", clientEmailResponse)

    return res.status(200).json({
      message: "Email send successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong...",
    })
  }
};