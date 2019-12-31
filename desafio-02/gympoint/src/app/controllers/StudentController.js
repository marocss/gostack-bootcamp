import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .integer()
        .required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    const passed = await schema.isValid(req.body);

    if (!passed) {
      return res.status(400).json({ error: 'Error on validation. ' });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'Email for student already taken.' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .integer()
        .required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    const passed = await schema.isValid(req.body);

    if (!passed) {
      return res.status(400).json({ error: 'Error on validation. ' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const student = await Student.findOne({ where: { id } });

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res
          .status(400)
          .json({ error: 'Email for student already taken.' });
      }
    }

    student.update(req.body);

    return res.json(student);
  }
}

export default new StudentController();
