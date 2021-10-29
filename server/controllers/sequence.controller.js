const Sequence_Model = require("../models/Sequences");

const getProspect = async (req, res) => {
  const {id} = req.params;
  try {
    const sequence = await Sequence_Model.findById(id);
    res.status(201).json(sequence);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const addProspect = async (req, res) => {
  const {id} = req.params;
  const formData = req.body;
  try {
    const sequence = await Sequence_Model.findById(id);
    sequence.prospects.push(formData);
    const updatedSequence = await Sequence_Model.findByIdAndUpdate(
      id,
      sequence,
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json({message: "Updated"});
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const newSequence = async (req, res) => {
  const newSequence = new Sequence_Model();
  try {
    await newSequence.save();
    res.status(201).json({id: newSequence._id});
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

const addTaskSequence = async (req, res) => {
  const {formData, option, value, sequenceId} = req.body;
  const sequence = await Sequence_Model.findById(sequenceId);
  console.log(sequence);
  switch (value) {
    case 0:
      const newTask0 = {
        type: formData.type0,
        run: formData.run0,
        checked: formData.checked0,
        time: formData.time0,
        templateName: formData.templateName0,
        templateDesc: formData.templateDesc0,
        option: option,
        value,
        stepNo: sequence.steps.length + 1,
      };
      try {
        sequence.steps.push(newTask0);
        await sequence.save();
        console.log(sequence);
        res.status(201).json(sequence);
      } catch (error) {
        res.status(409).json({message: error.message});
      }
      break;
    case 1:
      const newTask1 = {
        instruction: formData.instruction1,
        run: formData.run1,
        priority: formData.priority1,
        checked: formData.checked1,
        time: formData.time1,
        option: option,
        value,
        stepNo: sequence.steps.length + 1,
      };
      try {
        sequence.steps.push(newTask1);
        await sequence.save();
        console.log(sequence);
        res.status(201).json(sequence);
      } catch (error) {
        res.status(409).json({message: error.message});
      }
      break;
    case 2:
      const newTask2 = {
        type: formData.type2,
        notes: formData.notes2,
        run: formData.run2,
        checked: formData.checked2,
        time: formData.time2,
        priority: formData.priority2,
        option: option,
        value,
        stepNo: sequence.steps.length + 1,
      };
      try {
        sequence.steps.push(newTask2);
        await sequence.save();
        console.log(sequence);
        res.status(201).json(sequence);
      } catch (error) {
        res.status(409).json({message: error.message});
      }
      break;
    case 3:
      const newTask3 = {
        type: formData.type3,
        notes: formData.notes3,
        run: formData.run3,
        checked: formData.checked3,
        time: formData.time3,
        priority: formData.priority3,
        option: option,
        value,
        stepNo: sequence.steps.length + 1,
      };
      try {
        sequence.steps.push(newTask3);
        await sequence.save();
        console.log(sequence);
        res.status(201).json(sequence);
      } catch (error) {
        res.status(409).json({message: error.message});
      }
      break;
    case 4:
      const newTask4 = {
        type: formData.type4,
        message: formData.message4,
        run: formData.run4,
        checked: formData.checked4,
        time: formData.time4,
        option: option,
        value,
        stepNo: sequence.steps.length + 1,
      };
      try {
        sequence.steps.push(newTask4);
        await sequence.save();
        console.log(sequence);
        res.status(201).json(sequence);
      } catch (error) {
        res.status(409).json({message: error.message});
      }
      break;
  }
};

const getTaskSequence = async (req, res) => {
  const {id} = req.params;
  if (id !== undefined)
    try {
      const sequence = await Sequence_Model.findById(id);
      res.status(201).json(sequence);
    } catch (err) {
      console.log(err);
    }
  else {
    res.status(404);
  }
};

const deleteSequence = async (req, res) => {
  const {id} = req.params;

  try {
    await Sequence_Model.findByIdAndDelete(id);
    res.status(201).json({message: "Deleted"});
  } catch (err) {
    res.status(404).json({error: "Error"});
    // console.log(err);
  }
};

const getallsequence = async (req, res) => {
  const sequence = await Sequence_Model.find();
  res.status(201).json(sequence);
};

const testSequence = async (req, res) => {
  const {testData} = req.body;
  const sequence = await Sequence_Model.find();
  let i = 0;
  cron.schedule(`*/${Number(testData)} * * * *`, function () {
    if (i < 3) {
      sequence[2].prospects.map(async (seq) => {
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
      });
      i = i + 1;
      console.log("--------", i);
    } else {
      return res.status(201);
    }
  });
};

module.exports = {
  getallsequence,
  deleteSequence,
  getTaskSequence,
  addTaskSequence,
  newSequence,
  addProspect,
  getProspect,
  testSequence
};
