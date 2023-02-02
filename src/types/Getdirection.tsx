// import { regionNames } from ".././types/constants"
export default function GetDirection(entitiy: any) {
    var address_string = "";

    address_string =
        entitiy.address.line1 +
        "," +
        entitiy.address.line2 +
        "," +
        entitiy.address.city +
        "," +
        entitiy.address.region +
        "," +
        entitiy.address.postalCode +
        "," ;

    address_string = address_string.replace("undefined,", "");

    var origin: any = null;
    if (entitiy.address.city) {
        origin = entitiy.address.city;
    } else if (entitiy.address.region) {
        origin = entitiy.address.region;
    } else {
        origin = entitiy.address.country;
    }
    if (navigator.geolocation) {
        const error = (error: any) => {
            var getDirectionUrl =
                "https://www.google.com/maps/dir/?api=1&destination=" +
                address_string +
                "&origin=" +
                origin;

            window.open(getDirectionUrl, "_blank");
        };
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let currentLatitude = position.coords.latitude;
                let currentLongitude = position.coords.longitude;
                let getDirectionUrl =
                    "https://www.google.com/maps/dir/?api=1&destination=" +
                    address_string +
                    "&origin=" +
                    currentLatitude +
                    "," +
                    currentLongitude;
                window.open(getDirectionUrl, "_blank");
            },
            error,
            {
                timeout: 10000,
            }
        );
    }
}