import Loading from "./Loading";

const ImagePreview = ({ uploadImage, enhancedImage, loading}) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      {/* Original Image */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
          Original Image
        </h2>

        {uploadImage ? (
          <img
            src={uploadImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-80 ">
            No Image Selected
          </div>
        )}
      </div>

      {/* Enhancer Image */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
          Enhanced Image
        </h2>

        {enhancedImage && !loading && (
          <img
            src={enhancedImage}
            alt=""
            className="w-full h-full object-cover"
          />
        )}

        {loading ? <Loading></Loading> : <div className="flex items-center justify-center h-80 ">
            No Enhanced Image
          </div>}
      </div>
    </div>
  );
};

export default ImagePreview;
