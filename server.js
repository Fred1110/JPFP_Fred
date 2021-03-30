const express = require('express');
const {static} = express;
const path = require('path');



//server routes/app
const app = express();

app.use(express.json());

app.use('/dist', static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

//campus router
//get all campuses
app.get('/api/campuses', async(req, res, next) => {
  try {
    const campuses = await Campuses.findAll();
    res.send(campuses)
  } catch (error) {
    next(error)
  }
});

//get campuses/:id
app.get('/api/campuses/:id', async(req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id);
    res.send(campus);
  } catch (error) {
    next(error)
  }
});

//create campus
app.post('/api/campuses', async(req, res, next) => {
  try {
    const campus = Campuses.create(req.body);
    res.status(201).send(campus);
  } catch (error) {
    next(error)
  }
});

//update campus
app.put('/api/campuses/:id', async(req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id);
    res.send(await campus.update(req.body))
  } catch (error) {
    next(error)
  }
});

//delete campus
app.delete('/api/campuses/:id', async(req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})


//student router
//get all students
app.get('/api/students', async(req, res, next) => {
  try {
    const students = await Students.findAll({
      include: [Campuses]
    });
    res.send(students);
  } catch (error) {
    next(error)
  }
});

//students/:id
app.get('/api/students/:id', async(req, res,next) => {
  try {
    const student = await Students.findByPk(req.params.id);
    res.send(student);
  } catch (error) {
    next(error)
  }
});

//create student
app.post('/api/students', async(req, res, next) => {
  try {
    const student = await Students.create(req.body);
    res.status(201).send(student)
  } catch (error) {
    next(error)
  }
});

//update student
app.put('/api/students/:id', async(req, res, next) => {
  try {
    const student = await Students.findByPk(req.params.id);
    res.send(await student.update(req.body))
  } catch (error) {
    next(error)
  }
});

//delete student
app.delete('/api/students/:id', async(req, res, next) => {
  try {
    const student = await Students.findByPk(req.params.id);
    res.status(204).send(await Student.destroy())
  } catch (error) {
    next(error)
  }
});

//data models
const Sequelize = require('sequelize');
const {STRING, TEXT, DECIMAL} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/jpfp_campus_db');

//campus model
const Campuses = conn.define('campus', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'default-campus.jpg'
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: TEXT,
  }
});

//student model
const Students = conn.define('student', {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'default-student.jpg'
  },
  gpa: {
    type: DECIMAL,
    validate: {
      max: 4.0,
      min: 0.0
    }
  }
});

Campuses.hasMany(Students);
Students.belongsTo(Campuses);

const mapPromise = (items, model) => Promise.all(items.map(item => model.create(item)));

const init = async() => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
};

//syncAndSeed
const syncAndSeed = async() => {
  await conn.sync({force:true});

  //campuses
  const campuses = [
    {name: 'California Institute of Technology - Pasadena campus',
    // students: sheldon.firstName,
    imageUrl: 'https://caltech-prod.s3.amazonaws.com/main/images/ChenInstitute.2e16d0ba.fill-1600x810-c100.jpg',
    address: '1200 E California Blvd, Pasadena, CA 91125',
    description: 'The California Institute of Technology (Caltech) is a private research university in Pasadena, California. The university is known for its strength in science and engineering, and is one among a small group of institutes of technology in the United States which is primarily devoted to the instruction of pure and applied sciences.'},

    {name: 'Massachusetts Institute of Technology - Cambridge, MA campus',
    // students: howard.firstName,
    imageUrl:'https://media-exp1.licdn.com/dms/image/C561BAQHVK7iHOvU_pg/company-background_10000/0/1525979475481?e=2159024400&v=beta&t=w8bFzUtH7y_hjZbKlXvm0AHptjJnVF8YBpC5261PC1M',
    address: '77 Massachusetts Ave, Cambridge, MA 02139',
    description: 'Massachusetts Institute of Technology (MIT) is a private land-grant research university in Cambridge, Massachusetts. The institute has an urban campus that extends more than a mile (1.6 km) alongside the Charles River. The institute also encompasses a number of major off-campus facilities such as the MIT Lincoln Laboratory, the Bates Center, and the Haystack Observatory, as well as affiliated laboratories such as the Broad and Whitehead Institutes.'},

    {name: 'University of Cambridge - Cambridge, UK campus',
    // students: raj.firstName,
    imageUrl: 'https://www.telegraph.co.uk/content/dam/news/2019/06/07/Corpus-2_trans_NvBQzQNjv4BqIlB8N0-eCKir34PrHbfoBIDwrxTXZUARyEWi5sfgXlA.jpg',
    address: 'The Old Schools, Trinity Ln, Cambridge CB2 1TN, United Kingdom',
    description: "The University of Cambridge (legally The Chancellor, Masters, and Scholars of the University of Cambridge, also known as Cambridge University) is a collegiate research university in Cambridge, United Kingdom. Founded in 1209 and granted a royal charter by Henry III in 1231, Cambridge is the second-oldest university in the English-speaking world and the world's fourth-oldest surviving university, as well as one of the most prestigious academic institutions in the world. The university grew out of an association of scholars who left the University of Oxford after a dispute with the townspeople. The two English ancient universities share many common features and are jointly referred to as Oxbridge."},

    {name: 'Harvard University - Cambridge, MA campus',
    // students: amy.firstName,
    imageUrl: 'https://www.collegeconsensus.com/wp-content/uploads/2016/12/o-HARVARD-UNIVERSITY-BUILDING-facebook.jpg',
    address: '1515 Massachusetts Ave, Cambridge, MA 02138',
    description: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636 and named for its first benefactor, clergyman John Harvard, Harvard is the oldest institution of higher learning in the United States[6] and among the most prestigious in the world.'},

    {name: 'Princeton University - Princeton campus',
    // students: leonard.firstName,
    imageUrl: 'https://www.princeton.edu//sites/default/files/images/2017/06/20060425_NassauHall_JJ_IMG_5973.jpg',
    address: 'Clio Hall, Princeton, NJ 08544',
    description: 'Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746 in Elizabeth as the College of New Jersey, Princeton is the fourth-oldest institution of higher education in the United States and one of the nine colonial colleges chartered before the American Revolution. The institution moved to Newark in 1747, then to the current site nine years later. It was renamed Princeton University in 1896.'},

    {  name: 'The University of California, Los Angeles - Los Angeles campus',
    //  students: bernadatte.firstName,
    imageUrl: 'https://admission.ucla.edu/sites/default/files/slider-main-image/05-royce-2x.jpg',
    address: 'Los Angeles, CA 90095',
    description: 'The University of California, Los Angeles (UCLA) is a public land-grant research university in Los Angeles, California. UCLA traces its early origins back to 1882 as the southern branch of the California State Normal School (now San Jose State University). It became the Southern Branch of the University of California in 1919, making it the second-oldest (after UC Berkeley) of the 10-campus University of California system.'},

    {name: 'Pasadena City College - Pasadena campus',
    //  students: penny.firstName,
    imageUrl: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/pasadena-city-college-in-pasadena-california-ken-wolter.jpg',
    address: '1570 E Colorado Blvd, Pasadena, CA 91106',
    description: 'Pasadena City College was founded in 1924 as Pasadena Junior College. From 1928 to 1953, it operated as a four-year junior college, combining the last two years of high school with the first two years of college.'}

  ];

  const [CALTECH, MIT, UCUK, HVU, PU, UCLA, PCC] = await mapPromise(campuses, Campuses);


  //students

  const students = [
    {
    firstName: 'Amy',
    lastName: 'Farrah Fowler',
    campusId: HVU.id,
    email: 'a_f_f@harvard.edu',
    gpa: 3.9,
    imageUrl: 'https://external-preview.redd.it/3QOpH28aJyotLIyz1K_slSR1-OayvJ0FOhdPwnGAhHc.jpg?auto=webp&s=65f9d0a270b077db23cf785d3a9c9332cd369a60'
    },

    {
      firstName: 'Sheldon',
      lastName: 'Cooper',
      campusId: CALTECH.id,
      email: 'shc@caltech.edu',
      gpa: 4.0,
      imageUrl: 'https://www.cheatsheet.com/wp-content/uploads/2019/10/Sheldon-Cooper-683x1024.jpg'

    },

    {
      firstName: 'Penny',
      lastName: 'Hofstadter',
      campusId: PCC.id,
      email: 'penny@pasadena.edu',
      gpa: 3.0,
      imageUrl: 'https://static.wikia.nocookie.net/bigbangtheory/images/4/4d/TCCO-6.jpg/revision/latest?cb=20190512163833'
    },

    {
      firstName: 'Leonard',
      lastName: 'Hofstadter',
      campusId: PU.id,
      email: 'lnd_hf@princeton.edu',
      gpa: 3.8,
      imageUrl: 'https://www.cheatsheet.com/wp-content/uploads/2020/07/Leonard-Hofstadter.jpg'
    },

    {
      firstName: 'Bernadette',
      lastName: 'Rostenkowski',
      campusId: UCLA.id,
      email: 'br@ucla.edu',
      gpa: 4.0,
      imageUrl: 'https://static.horizontimes.com/wp-content/uploads/2019/01/23153811/Melissa-Rauch-as-Bernadette-Rostenkowski-Wolowitz-20190123153810-20190123153810.jpg'
    },

    {
      firstName: 'Howard',
      lastName: 'Wolowitz',
      campusId: MIT.id,
      email: 'hw@mit.edu',
      gpa: 3.7,
      imageUrl:'https://www.cheatsheet.com/wp-content/uploads/2019/10/Howard-Wolowitz-705x1024.jpg'
    },

    {
      firstName: 'Rajesh',
      lastName: 'Koothrappali',
      campusId: UCUK.id,
      email: 'rajk@cambridge.edu',
      gpa: 3.8,
      imageUrl: 'https://www.cheatsheet.com/wp-content/uploads/2019/10/Raj-683x1024.jpg'
    }
  ];

  const [Amy, Sheldon, Penny, Leonard, Bernadatte, Howard, Raj] = await mapPromise(students, Students);
};

//init



init();
