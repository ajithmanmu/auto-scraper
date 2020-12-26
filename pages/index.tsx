import useSWR from 'swr'
import Home from '../components/Home'
import fetcher from '../utils/fetcher';
import Loading from '../components/Loading';
import Error from '../components/Error';

const IndexPage = () => {
  const { data, error } = useSWR('make', fetcher);
  if(error) return <Error />
  if(!data) return <Loading />;
  return <Home make={data} />
}

export default IndexPage
