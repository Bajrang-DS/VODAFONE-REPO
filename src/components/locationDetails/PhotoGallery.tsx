import * as React from "react";
type props = {
 photoGallery:any;
  height:any;
  width:any;
  photo:any;
};
const PhotoGallery = (data: props) => {
  const { photo, height, width } = data;
  const photos = photo.map((element:any) => (
    <div>
      <img
        height={height}
        src={element.image.url} // use normal <img> attributes as props
        width={width}
        className="image"
        alt="image"
      >
      </img>
    </div>
  ));


  return (
    <>
      <div className="bg-[#E1F4F2] w-full mb-2 py-5 md:py-10">
                <h2 className="sec-title text-center">
                {data.photoGallery}
                </h2>
                <div className="container">
        <div className="grid space-x-5 object-cover md:grid-cols-2 lg:grid-cols-3">
            {photos}
        </div>
        </div>
      </div>
    </>
  );
};

export default PhotoGallery;