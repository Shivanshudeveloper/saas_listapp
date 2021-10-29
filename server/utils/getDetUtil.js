async function getDet1() {
  const sequence = await Sequence_Model.find();
  const currentDay = new Date().getDay();
  const currentTime = new Date().getHours();

  cron.schedule("0 * * * *", function () {
    sequence[2].prospects.map(async (seq) => {
      if (String(currentDay) === String(seq?.type?.run - 1)) {
        // console.log(userDetails[0].emails);

        if (seq?.type?.time.split(":")[0] === String(currentTime)) {
          if (seq?.type?.option === "Email") {
            const userDetails = await User_Model.find();
            let password = "";
            userDetails.map((user) => {
              if (user.email === seq?.email) password = user.password;
            });
            try {
              (transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: seq?.email,
                  pass: password,
                },
              })),
                (mailOption = {
                  from: seq?.email,
                  to: seq?.contact?.email,
                  subject: seq?.type?.templateName,
                  html: seq?.type?.templateDesc,
                }),
                transporter.sendMail(mailOption, (err, data) => {
                  console.log("Email Sent!");
                });
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    });
    console.log("********");
  });
}

module.exports = getDet1;