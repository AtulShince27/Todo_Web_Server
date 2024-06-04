import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '@prisma/client';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(
    @Body()
    todoData: {
      title: string;
      date: string;
      status: string;
      description?: string;
    },
  ): Promise<Todo> {
    return this.todoService.createTodo({
      title: todoData.title,
      status: todoData.status,
      date: todoData.date,
      description: todoData.description,
    });
  }

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getTodoById(+id);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body()
    todoData: {
      title?: string;
      date?: string;
      status?: string;
      description?: string;
    },
  ): Promise<Todo> {
    try {
      // Validate the data (optional, depending on your entity validation)
      if (!todoData) {
        throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
      }

      // Update the todo in the service
      const updatedTodo = await this.todoService.updateTodo(+id, todoData);
      if (!updatedTodo) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }

      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.deleteTodo(+id);
  }
}
