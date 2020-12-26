import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllUids, getSpec } from '../../lib/db';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const SpecPage = ({ spec, errors }) => {
    if(errors) return <Error />;
    if(!spec) return <Loading />;
    const imageStyle = {
      backgroundImage: `url(${spec.image})`,
    };
    return (
        <div>
          <section className="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
              <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg w-screen">
                  <div className="lg:w-1/2">
                      <div className="h-64 bg-cover lg:rounded-lg lg:h-full" style={imageStyle}></div>
                  </div>
                  <div className="lg:py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
                      <h2 className="text-2xl text-gray-800 font-bold md:text-3xl">{spec.name}</h2>
                      <h4 className="text-2xl text-gray-800 font-bold md:text-3xl my-4"><span className="text-indigo-600">{spec.variant}</span></h4>
                      <h4 className="text-2xl text-gray-800 font-bold md:text-3xl my-4">{spec.type}</h4>
                      <h4 className="text-2xl text-gray-800 font-bold md:text-3xl my-4">{spec.price}</h4>
                  </div>
              </div>
          </section> 
          <section className="bg-gray-100">
          <div className="bg-indigo-700 px-4 py-5 border-b rounded-t sm:px-6 lg:mx-8">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    Overview
                  </h3>
                </div>
                <div className="bg-white shadow overflow-hidden sm:rounded-md lg:mx-8">
                  <ul className="divide-y divide-gray-200">
                    {
                      Object.entries(spec.overview).map(([key, value]) => {
                        if(!value) return null;
                        return <li>
                                  <a className="block hover:bg-gray-50">
                                    <div className="px-4 py-2 sm:px-2">
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm font-thin text-gray-700 truncate font-bold">
                                          {key}
                                        </p>
                                      </div>
                                      <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                          <p className="flex items-center text-sm font-light text-gray-500">
                                            {value}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                </li>
                    })
                    }
                  </ul>
                </div>
          </section>
          
        </div>
    )
}

export default SpecPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getAllUids();
    const paths = data.map((uid:string)=>({
        params: {
            uid
        }
    }));
    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { uid } = params;
    const result = await getSpec(uid);
    const spec = JSON.parse(result)[0];
    return { props: { spec }, revalidate: 1 }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
