'use strict';

const querystring = require('querystring'),
    xml = require('xml'),
    pResultJSON = {
        Response: [{
            Say: "Hi Buddy Pee Pee Pee result"
        }]
    }
exports.action_handler = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  // no response value expected for this operation
  var speechresult=args.TwilioResult.originalValue.SpeechResult,
      confidence=Math.round(args.TwilioResult.originalValue.Confidence*100),
      resultJSON = {
        Response: [{
            Say: " You Said "+speechresult+" I'm confident "+confidence+" %"
        },
                   {
                     "Hangup":""
                   }]
    },
  resultXML=xml(resultJSON, {        declaration: true    })
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml')
  console.log("Got <",speechresult,">@confidence","Sending",resultXML)
      res.end(resultXML);
}

exports.call_handler = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  // no response value expected for this operation
  var callJSON = {
        Response: [{
            Gather: [{
                _attr: {
                    input: "speech",
                    action: "/action"//,                    partialResultCallback: "/partial"
                }
            }, {
                Say: "Hi! Please Speak Something"
            }]
        }]
    },
      argJSON=JSON.stringify(args),
      callXML = xml(callJSON, {        declaration: true    })
  console.log('call_handler',args["CallSid"]["value"])
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml')
  res.end(callXML);
}

exports.partial_handler = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  // no response value expected for this operation
  var argJSON=JSON.stringify(args)
  console.log('partial_handler',args)
  res.end(argJSON);
}

