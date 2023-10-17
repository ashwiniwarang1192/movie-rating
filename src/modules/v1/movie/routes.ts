import * as movieController from './controllers/movie-controller';

const routes = [
  {
    path: '/listing',
    method: 'get',
    action: movieController.getMovieListing  
  },
  {
    path: '/genre/listing',
    method: 'get',
    action: movieController.getGenreListing  
  }
];

export default routes;
