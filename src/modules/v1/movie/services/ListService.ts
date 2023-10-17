/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
import {
  CustomError
} from '../../../../utils/require';
import { successResponse, columnParamMapping } from '../../../common/services/helper'
import { Movies, Genre } from '../../../common/models/mongo'

class ListService {
  /**
   * Will retrieve all movies from db
   */

  private getPagination(pageNumber=1, limit=10){
    const startIndex = (pageNumber - 1) * limit;
    return {startIndex, limit}
  }

  private getSortOptions(queryParams) : any {
    const sortByColumn = '_id';
    const { sortBy, orderBy } = queryParams;
    return {
      sortBy: sortBy ? (columnParamMapping?.[sortBy]?.columnName) : sortByColumn,
      orderBy: (orderBy && orderBy == 'ASC') ? 1 : -1,
    };
  }

  private getFilterData(queryParams){
    const { genre } = queryParams;
    const condArr= (genre) ? genre.split(',') : [];
    const condition = {
      genre: {$in: condArr}
    }
    return condition
  }

  private getSearchOptions(queryParams) : any {
    const { searchText } = queryParams;
    if(!searchText) return {}
    const condition = { '$or': [ 
      { name: { "$regex": searchText, "$options": 'i' } }, 
      { director: { "$regex": searchText, "$options": 'i' } } 
    ]}
    return condition
  }

  public async getMovieListing(queryParams): Promise<any> {
    try {
      let filterCondition = {}
      const { startIndex, limit } = this.getPagination(queryParams?.page, queryParams?.pageSize)
      const { sortBy, orderBy } = this.getSortOptions(queryParams);
      const seachCondition = this.getSearchOptions(queryParams)
      if(queryParams?.genre){
        filterCondition = this.getFilterData(queryParams)
      }
      const mergedConditions = {...seachCondition, ...filterCondition}
      console.log('mergedConditions',mergedConditions)
      const mySort = {[sortBy]: orderBy}
      console.log("sortBy",sortBy,"orderBy",orderBy,'mySort',{[sortBy]: orderBy},'condition',mergedConditions)
      const totalPosts = await Movies.countDocuments().exec();
      const data = await Movies.find(mergedConditions)
        .sort(mySort)
        .skip(startIndex)
        .limit(limit)
        .exec();
      const totalPages = Math.ceil(totalPosts / limit);
      return successResponse({
        statusMessage: 'Movie listing(s) retrieved successfully',
        totalPages,
        data,
      });
    } catch (error) {
      console.error(`Failed to return movie listing : ${JSON.stringify(queryParams)}, error : ${error.stack}`);
      console.log('Order Lists : ', { queryParams, error });
      return CustomError.returnStandardErrorResponse(error);
    }
  }

  public async getGenreListing(): Promise<any> {
    try {
      const data = await Genre.find()
      return successResponse({
        statusMessage: 'Movie listing(s) retrieved successfully',
        data,
      });
    } catch (error) {
      console.error(`Failed to return movie listing : error : ${error.stack}`);
      return CustomError.returnStandardErrorResponse(error);
    }
  }
}

export default ListService;

