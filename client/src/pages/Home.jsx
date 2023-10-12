import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='bg-slate-950'>
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h3 className='text-slate-300 font-bold text-3xl'>
            Office & Coworking Space
          </h3>
          <h1 className='text-slate-300 font-bold text-3xl lg:text-5xl'>
            Discovered and Share Great
            
            Place to <span className='text-lime-300'>Work From Anywhere</span>
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm'>
            Join our community of remote workers and digital nomads who have amazing 
            <br />
            places to work from. Whether you need a quiet cafe, a co-working space, or 
            <br />
            a scenic spot, weve got you covered.          
          </div>
          <button className='bg-lime-300 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 mb-4 w-40'>
            <Link
              to={'/search'}
              className='text-xs sm:text-sm text-slate-700 font-bold'
            >
              Find a Place
            </Link>
          </button>
        </div>
      </div>
      
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto items-center text-center'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-5xl'>
          The Ideal <i>Space</i> for all Your Teams and Tasks
        </h1>
        <div className='mt-5'>
          <button
            className='bg-lime-200 text-white p-3 mr-10 w-40 shadow-md'
            >
            <b className='text-slate-700'>Wifi Speeds</b> 
          </button>
          <button
            className='bg-lime-200 text-white p-3 w-40 shadow-md'
            >
            <b className='text-slate-700'>Noise levels</b>
          </button>
          <button
            className='bg-lime-200 text-white p-3 ml-10 w-40 shadow-md'
            >
            <b className='text-slate-700'>Access to Plugs</b>
          </button>
        </div>
        <div className='text-slate-700 text-xs sm:text-sm my-8'>
          Get the essential details you need to ensure a productive workspace experience. Check WiFi
          <br />
          speeds for seamless online work, assess noise levels for concentration, find power outlets for charging,
          <br />
          and read reviews from fellow professionals. Make every visit count          
        </div>
        <button
            className='bg-lime-200 text-white p-3 w-40 shadow-md mt-4'
            >
              <Link
                to={'/search'}
                className='text-slate-700 font-bold hover:opacity-95 disabled:opacity-80'
                >
                Book Now
              </Link>
        </button>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-5xl mt-9'>
          My Partner
        </h1>                
        <div className='mt-5'>
          <button
            className='text-white p-3 mr-10 w-40'
            >
            <b className='text-slate-700'>Partner 1</b> 
          </button>
          <button
            className='text-white p-3 w-40'
            >
            <b className='text-slate-700'>Partner 2</b>
          </button>
          <button
            className='text-white p-3 ml-10 w-40'
            >
            <b className='text-slate-700'>Partner 3</b>
          </button>
          <button
            className='text-white p-3 ml-10 w-40'
            >
            <b className='text-slate-700'>Partner 4</b>
          </button>
        </div>
      </div>
      
      <div className='bg-slate-950'>
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto items-center text-center'>
          <h1 className='text-slate-300 font-bold text-3xl lg:text-5xl'>
            Adjust to your needs, there are many places that can be used for a 
            <span className='text-lime-300'> better working experience</span>
          </h1>
          <div>


          </div>
          <div className='mt-5'>
            <button
              className='border-lime-300 border text-white p-3 mr-10 w-40'
              >
              <b className='text-slate-300'>Event</b> 
            </button>
            <button
              className='border-lime-300 border text-white p-3 w-40 shadow-md'
              >
              <b className='text-slate-300'>Meeting</b>
            </button>
            <button
              className='border-lime-300 border text-white p-3 ml-10 w-40 shadow-md'
              >
              <b className='text-slate-300'>Photo Shoot</b>
            </button>
            <button
              className='border-lime-300 border text-white p-3 ml-10 w-40 shadow-md'
              >
              <b className='text-slate-300'>Video Shoot</b>
            </button>
          </div>
          <button
            className='bg-lime-200 text-white p-3 w-40 shadow-md mt-4'
            >
              <Link
                to={'/search'}
                className='text-slate-700 font-bold hover:opacity-95 disabled:opacity-80'
                >
                Book Now
              </Link>
          </button>
        </div>

        <div className='items-center text-center'>
          <h1 className='text-slate-300 font-bold text-3xl lg:text-5xl'>
            Choose <i className='text-lime-300'> Near</i> Space
          </h1>
        </div>
        {/* listing results for offer, sale and rent */}
        
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {offerListings && offerListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-300'>Recent offers</h2>
                <Link className='text-sm text-lime-300 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-300'>Recent places for rent</h2>
                <Link className='text-sm text-lime-300 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-300'>Recent places for sale</h2>
                <Link className='text-sm text-lime-300 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='my-8 text-slate-950'>.</div>
      </div>
      
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <div className='grid grid-cols-2'>
          <div className=''>
            <h1 className='text-slate-700 font-bold text-3xl lg:text-5xl'>
              Frequently <br /> Asked <br /> Questions
            </h1>
          </div>
          <div className='grid grid-cols-1 gap-4 place-content-center h-48  font-bold text-slate-700'>
            <button
              className='border-b-2 border-slate-950 p-3 mr-2 text-left'
              >
              Apa itu Workfrom?
            </button>
            <button
              className='border-b-2 border-slate-950 p-3 mr-2 text-left'
              >
              Fasilitas apa saja yang ditawarkan
            </button>
            <button
              className='border-b-2 border-slate-950 p-3 mr-2 text-left'
              >
              Apakah buka di akhir pekan dan hari libur?
            </button>
          </div>
        </div>
      </div>
      
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