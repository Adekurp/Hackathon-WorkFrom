import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import Contact from '../components/Contact';
import {
    FaBath,
    FaBed,
    FaChair,
    FaUserCircle,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';


export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div>
      <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && (
          <p className='text-center my-7 text-2xl'>Something went wrong!</p>
        )}
        {listing && !loading && !error && (
          <div>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className='h-[550px]'
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
              <FaShare
                className='text-slate-500'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                Link copied!
              </p>
            )}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
              <p className='text-2xl font-semibold'>
                {listing.name} - Rp {' '}
                {listing.offer
                  ? listing.discountPrice.toLocaleString('en-US')
                  : listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && ' / month'}
              </p>
              <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                <FaMapMarkerAlt className='text-green-700' />
                {listing.address}
              </p>
              <div className='flex gap-4'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {listing.offer && (
                  <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                    Rp {+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>
              <p className='text-slate-800'>
                <span className='font-semibold text-black'>Description - </span>
                {listing.description}
              </p>
              <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaUserCircle className='text-lg' />
                  {listing.capacity > 1
                    ? `${listing.capacity} capacity `
                    : `${listing.capacity} capacity`}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBath className='text-lg' />
                  {listing.toilet > 1
                    ? `${listing.toilet} toilet `
                    : `${listing.toilet} toilet `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaParking className='text-lg' />
                  {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaChair className='text-lg' />
                  {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
              </ul>
              {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                  Contact landlord
                </button>
              )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <div className='bg-slate-950'>
        <div className='gap-6 p-20 px-3 mx-auto text-center'>
          <div className='grid grid-cols-3'>
            <div>
              <button
                className='border border-lime-200 text-white p-1 w-50 shadow-md mb-9'
                >
                <b className='text-slate-700 font-bold text-3xl lg:text-4xl'>workform</b>
              </button>
              <h1 className='text-slate-700 text-xs sm:text-sm '>
              Komp. Ruko Centre Point Medan Jalan
              <br />
              Timor Blok G No. III/IV 2nd Floor, Gang
              <br />
              Buntu, Medan Timur, Medan City, 
              <br />
              North Sumatra 20231
              </h1>
            </div>
            <div className='grid grid-cols-2 place-self-center text-slate-700 text-left'>
              <div>
                <h1 className='text-slate-700 font-bold'>
                  As owner
                </h1>
                <p className='text-slate-700 text-xs sm:text-sm'>Location</p>
                <p className='text-slate-700 text-xs sm:text-sm'>Use Case</p>
              </div>
              <div>
                <h1 className='text-slate-700 font-bold'>
                  As a tenant
                </h1>
                <p className='text-slate-700 text-xs sm:text-sm'>Manage Listing</p>
                <p className='text-slate-700 text-xs sm:text-sm'>Payments</p>
              </div>
            </div>
            <div className='place-self-center'>
              <button
                className='bg-lime-200 rounded-lg text-white p-3 mr-2'
                >
              </button>
              <button
                className='bg-lime-200 rounded-lg text-white p-3 mr-2'
                >
              </button>
              <button
                className='bg-lime-200 rounded-lg text-white p-3 mr-2'
                >
              </button>
              <button
                className='bg-lime-200 rounded-lg text-white p-3 mr-2'
                >
              </button>
              <button
                className='bg-lime-200 rounded-lg text-white p-3 mr-2'
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}