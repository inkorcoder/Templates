mapStyles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

initMap = ->
	styledMap = new google.maps.StyledMapType mapStyles, {
		name: "Styled Map"
	}
	center = {
		lat: 59.9270362
		lng: 30.3344373
	}
	map = new google.maps.Map document.getElementById('map'), {
		center: center
		zoom: 16
		disableDefaultUI: false
		scrollwheel: false
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
	}
	map.mapTypes.set 'map_style', styledMap
	map.setMapTypeId 'map_style'

	image = 'img/map.png'
	beachMarker = new google.maps.Marker
		position: center
		map: map
		icon: image
		title: 'Адрес как найти'

	contentString = "
		<h3 class='title'>Заголовок</h3>
		<p class='paragraph'>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi libero, assumenda officiis optio incidunt expedita architecto eos tempore esse molestias praesentium necessitatibus ipsum, soluta nulla quibusdam aliquid enim voluptas quos!
		</p>
	"

	infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	beachMarker.addListener 'click', ->
		infowindow.open map, beachMarker
		return

	return