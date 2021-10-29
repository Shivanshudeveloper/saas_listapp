// here are some routes needed for future

// ROUTES NOT NEEDED FOR NOW
// router.post("/searchtask", async (req, res) => {
//   const { contact, type, status } = req.body;
//   try {
//     const contactr = new RegExp(contact, "i");
//     const typer = new RegExp(type, "i");
//     const newStatus =
//       status === "none"
//         ? null
//         : status.toUpperCase() === "COMPLETED"
//         ? true
//         : false;

//     const tasks = await Task_Model.find({
//       $or: [{ contact: contactr }, { type: typer }, { completed: newStatus }],
//     });
//     res.status(200).json(tasks);
//     // console.log(tasks);
//   } catch (error) {
//     console.log(error);
//   }
// });

// //////////////////
// Schedule Event
// //////////////////

// async function getDet() {
//   const sequence = await Sequence_Model.find();
//   const currentDay = new Date().getDay();
//   const currentTime = new Date().getHours();

//   cron.schedule("* * * * *", function () {
//     console.log("--------");
//     sequence[0].steps.map(async (seq) => {
//       if (String(currentDay) === String(seq.run - 1)) {
//         if (seq?.time === undefined) {
//           console.log("Today", seq?.option);
//         } else {
//           // console.log("Today ", seq?.option, " at ", seq?.time.split(":")[0]);
//           // if (seq?.time.split(":")[0] === currentTime) {
//           const userEmails = await Sequence_Model.findById(sequence[0]._id);
//           if (seq.option === "Email") {
//             // userEmails.map((person) => {
//             //   console.log(person.email);
//             // });
//             // try {
//             //   (transporter = nodemailer.createTransport({
//             //     service: "gmail",
//             //     auth: {
//             //       user: "evencloudupload@gmail.com",
//             //       pass: "Evencloud@1234",
//             //     },
//             //   })),
//             //     (mailOption = {
//             //       from: "evencloudupload@gmail.com",
//             //       to: "",
//             //       subject: seq?.templateName,
//             //       html: seq?.templateDesc,
//             //     }),
//             //     transporter.sendMail(mailOption, (err, data) => {
//             //       console.log("Email Sent!");
//             //     });
//             // } catch (error) {
//             //   console.log(error);
//             // }
//           }
//           // }
//         }
//       }
//     });
//     console.log("********");
//     console.log("");
//   });
// }