google.maps.event.addDomListener(window, 'load', function()
{
	var lng = 139.518196;
	var lat = 35.528015;

	/*オプション*/
	var mapOptions = {
		zoom: 16,
		center: new google.maps.LatLng(lat, lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP,

		panControl: true,
		zoomControl: true,
		mapTypeControl: true,
		scaleControl: true,
		streetViewControl: true,
		navigationControl: true,
        scrollwheel: false,

		mapTypeControlOptions: { mapTypeIds: ['textChange', google.maps.MapTypeId.ROADMAP] }
	};

	var map = new google.maps.Map(document.getElementById('gmap'), mapOptions);


	/*アイコン*/
	new google.maps.Marker({
	position: new google.maps.LatLng(35.528015,139.518196),
	map: map,
	// icon: "img/pin.png"
	});


	/*スタイル*/
	var styleOptions = [{
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }] /*simplified*/
	}, {
  	featureType: 'all',
  	elementType: 'geometry',
  	stylers: [{ saturation: '0' }, { gamma: '1.0' }, { lightness: '0' }
	]
	}];

  	var styledMapOptions = { name: 'First Ascent' }

	var myMapType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  	map.mapTypes.set('textChange', myMapType);
  	map.setMapTypeId('textChange');


});

