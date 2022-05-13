const { default: Terra } = require("terra-api");
const https = require('https');
require("dotenv").config();
var request = require('request');

// setup a new object instance
const terra = new Terra(process.env.DEV_ID, process.env.API_KEY);

// ---------------------------
// Server
// ---------------------------
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Webhook port
app.post("/hook", (req, _) => {
    console.log("Hook started");
    const r = req.body;
    console.log(r.data);
    console.log("Hook after data");
    if (r["type"] === "auth") {
      terra.setCurrentUser(r.user.user_id);
      terra.getAthlete(true).then((r) => console.log(r));
    }
  });
  
  app.get("/", (req, res) => {
    res.send(process.env.API_KEY);
    const terra = new Terra(process.env.DEV_ID, process.env.API_KEY);
    // terra.setCurrentUser('f490e3fe-400e-4129-b456-ef4e30260a55');
    // terra.getAthlete(false).then((res) => console.log(res.athlete.user.first_name));

    query_data = {
        "data":[        
            {
                "MEAN_RR":721.9018968733334
            },
            {
                "MEDIAN_RR":727.26728
            },
            {
                "SDRR":74.72231522414693
            },
            {
                "RMSSD":12.36126389253763
            },
            {
                "SDSD":12.36106933625897
            },
            {
                "SDRR_RMSSD":6.044876630233259
            },
            {
                "HR":84.12186830059788
            },
            {
                "pNN25":4.933333333333334
            },
            {
                "pNN50":0.0
            },
            {
                "SD1":8.743512885541394
            },
            {
                "SD2":105.3109669850863
            },
            {
                "KURT":1.262958154031763
            },
            {
                "SKEW":-0.7037788098783421
            },
            {
                "MEAN_REL_RR":8.099030355424758
            },
            {
                "MEDIAN_REL_RR":-0.0009511715487
            },
            {
                "SDRR_REL_RR":0.01760474788590069
            },
            {
                "RMSSD_REL_RR":0.01120750259732299
            },
            {
                "SDSD_REL_RR":0.01120750077061654
            },
            {
                "SDRR_RMSSD_REL_RR":1.5708002
            },
            {
                "KURT_REL_RR":1.26295
            },
            {
                "SKEW_REL_RR":-0.70377
            },
            {
                "VLF":1016.073
            },
            {
                "VLF_PCT":59.818
            },
            {
                "LF":615.9145
            },
            {
                "LF_PCT":36.26001
            },
            {
                "LF_NU":90.23971
            },
            {
                "HF":66.617057
            },
            {
                "HF_PCT":3.921867
            },
            {
                "HF_NU":9.760288
            },
            {
                "TP":1698.605
            },
            {
                "LF_HF":9.2455986
            },
            {
                "HF_LF":0.108159572
            },
            {
                "sampen":2.097342
            },
            {
                "higuci":1.24369
            },
            {
                "datasetId":2
            }
        ]
            
    }

    request.post(
        'http://127.0.0.1:5000/predict',
        { json: query_data },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );



  });
  
  app.get("/session", (req, res) => {
    terra
      .generateWidgetSession("refID", ["GARMIN", "FITBIT"], "EN")
      .then((s) => res.send(s.url))
      .catch((e) => console.log(e));
  });

  app.get("/stress", (req, res) => {

    console.log("stress called")
    
    request.get(
        'https://686b-129-45-25-131.ngrok.io/sleep',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("received with success");
                // console.log(body);
            }
        }
    );

  });