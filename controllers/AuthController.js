const Use   = require('../models/use')
const bcrypt  =require('bcryptjs')
const config = require("../config.json");
const jwt    =require('jsonwebtoken')
const { use } = require('../routes/users');
const nodemailer = require('nodemailer');
const Role = require('../middleware/role');



const register = async (req, res) => {
  const { username, email, phone, password} = req.body;
  console.log(
    req.body.username
)
console.log(
req.body.email
)
console.log(
req.body.phone
)
console.log(
req.body.password
)



  const verifUtilisateur = await Use.findOne({ email });
  if (verifUtilisateur) {
    res.status(403).send({ message: "Utilisateur existe deja !" });
  } else {
    const nouveauUtilisateur = new Use();

    mdpEncrypted = await bcrypt.hash(phone, 10);

    nouveauUtilisateur.username = username;
    nouveauUtilisateur.email = email;
    nouveauUtilisateur.phone = phone;
    nouveauUtilisateur.password = mdpEncrypted; 
    nouveauUtilisateur.isVerified = false;

    nouveauUtilisateur.save();

    
    // token creation
    const token = jwt.sign({ _id: nouveauUtilisateur._id, role: Role.Utilisateur }, config.token_secret, {
      expiresIn: "120000", // in Milliseconds (3600000 = 1 hour)
    });

    sendConfirmationEmail(email, token);
    res.status(201).send({ message: "success", uses: nouveauUtilisateur, "Token": jwt.verify(token, config.token_secret) });
  }
};


  const reEnvoyerConfirmationEmail = async (req, res) => {
    const utilisateur = await Use.findOne({ "email": req.body.email });
  
    if (utilisateur) {
      // token creation
      const token = jwt.sign({ _id: utilisateur._id, email: utilisateur.email, role: Role.Utilisateur }, config.token_secret, {
        expiresIn: "60000", // in Milliseconds (3600000 = 1 hour)
      });
  
      sendConfirmationEmail(req.body.email, token);
  
      res.status(200).send({ "message": "L\'email de confirmation a été envoyé a " + utilisateur.email })
    } else {
      res.status(404).send({ message: "Utilisateur innexistant" })
    }
  };  

  async function sendConfirmationEmail(Email, token) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testrapide45@gmail.com',
        pass: 'biglou009'
      }
    });
  
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        console.log("Server not ready");
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  
  
    const urlDeConfirmation = "http://localhost:3000/api/confirmation/"+ token;
  
  
    const mailOptions = {
        from: 'E-PHARM<testrapide45@gmail.com>',
      to: Email,
      text: 'For clients with plaintext support only',
      subject: 'E-PHARM ACCOUNT ',
      html: "<h3>Veuillez confirmer votre email en cliquant sur ce lien : </h3><a href='" + urlDeConfirmation + "'>Confirmation</a>"
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
}
const confirmation = async (req, res) => {

  var tokenValue;
  try {
    tokenValue = jwt.verify(req.params.token, config.token_secret);
  } catch (e) {
    return res.status(400).send({ message: 'Le lien verification a peut être expireé, Veuillez revérifier votre email.' });
  }

  Use.findById(tokenValue._id, function (err, use) {
    if (!use) {
      return res.status(401).send({ message: 'Aucun utilisateur, Veuillez proceder a l\'inscription.' });
    }
    else if (use.isVerified) {
      return res.status(200).send({ message: 'Cet utilisateur a deja été verifié, Veuillez vous connecter' });
    }
    else {
      use.isVerified = true;
      use.save(function (err) {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        else {
          return res.status(200).send({ message: 'Votre compte a été verifié' });
        }
      });
    }
  });
}

const login = async (req, res) => {
  console.log("body");
  const { email, password } = req.body;

  const use = await Use.findOne({ email });

  if (use && (await bcrypt.compare(password, use.password))) {
    const token = jwt.sign({ id: use._id, email }, config.token_secret, {
      expiresIn: "360000",
    });

    if (!use.isVerified) {
      res.status(200).send({ use, message: "email non verifié" });
    } else {
      res.status(200).send({ token, use, message: "success" });
    }

  } else {
    res.status(403).send({ message: "mot de passe ou email incorrect" });
  };
}






module.exports ={
register, login,reEnvoyerConfirmationEmail,confirmation
}
