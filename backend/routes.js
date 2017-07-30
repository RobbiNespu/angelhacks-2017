const express = require( 'express' );
const router = express.Router();
var models = require( './models' );
var User = models.User;
var FoodProvider = models.FoodProvider;
var Item = models.Item;

router.get( '/providers', ( req, res ) => {
    FoodProvider.find( {}, ( err, providers ) => {
        if ( err ) {
            res.json( { success: false, message: err } );
        }
        else if ( !providers ) {
            res.json( { success: false, message: "No providers found" } );
        }
        else {
            res.json( { success: true, providers: providers } );
        }
    } )
} )

router.post('/geocode', (req, res) => {
    console.log("GEO", req.body.geocode);
    FoodProvider.findById(req.body.providerid, (err, provider) => {
        console.log(provider);
        provider.geocode = req.body.geocode;
        console.log(req.body.geocode);
        provider.save((err, response) => {
            res.json({success: true})
        })
        .catch(err => res.json({success: false}))
    })
})

router.post( '/providers', ( req, res ) => {
    var newProvider = new FoodProvider( {
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
        geocode: req.body.geocode
    } );
    newProvider.save(( err, providers ) => {
        if ( err ) {
            console.log( "error posting provider", err );
            res.json( { success: false, message: err } );
        }
        else {
            res.json( { success: true, providers: providers } );
        }
    } );
} );

router.get('/providers/:providerId', (req, res) => {
  FoodProvider.findById(req.params.providerId, (err, provider) => {
    if (err) {
      res.json({success: false, message: err});
    }
    else if (!provider) {
      res.json({success: false, message: "No provider found"});
    }
    else {
      res.json({success: true, provider: provider});
    }
  })
})

router.get('/providers/:providerId/items', (req, res) => {
  FoodProvider.findById(req.params.providerId)
  .populate('forSale')
  .exec((err, provider) => {
    if (err) {
      res.json({success: false, message: err});
    }
    else if (!provider) {
      res.json({success: false, message: "No provider found"});
    }
    else {
      res.json({success: true, provider: provider});
    }
  })
})

router.post('/providers/:providerId/new-item', (req, res) => {
  var newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    price: req.body.price,
    description: req.body.description
  })
  newItem.save()
  .then(item => {
    FoodProvider.findById(req.params.providerId)
    .then(provider => {
        var newForSale = [...provider.forSale];
        newForSale.push(item._id);
        // Push the item id into the community items array then update in database
        provider.update({forSale: newForSale})
        .then(result => {
          provider.items = newForSale;
          console.log("You posted an item for your restaurant!");
          // Send back the community json object with the updated array
          return res.json({success: true, response: provider});
        });
    });
  })
  .catch(err => {
    console.log(err);
    return res.json({success: false, message: err});
  });
})

module.exports = router;
