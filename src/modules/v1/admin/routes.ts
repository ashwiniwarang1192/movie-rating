import * as movieController from './controllers/movie-controller';
import moduleConfig from './config/default';
import validateRequest from '../../../hooks/requestValidation';
import * as validatorFor from './RequestValidator';

const routes = [
  {
    path: '/movie',
    method: 'get',
    action: movieController.getMovie  
  },
  {
    path: '/movie',
    method: 'post',
    action: movieController.addMovie,
    hook: validateRequest(validatorFor.insertMovieDetails),
  },
  {
    path: '/movie/:movieId',
    method: 'put',
    action: movieController.updateMovie  
  },
  {
    path: '/movie',
    method: 'delete',
    action: movieController.deleteMovie  
  },
  {
    path: '/movie/genre',
    method: 'post',
    action: movieController.addGenre  
  }
];

export default routes;
