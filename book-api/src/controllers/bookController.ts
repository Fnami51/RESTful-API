import { Request, Response } from 'express';
import Book from '../models/Book';

export const addBook = async (request: Request, response: Response) => {
  try {
    const book = new Book({...request.body, publicationDate: new Date()});
    await book.save();
    response.status(201).json(book);
  } catch (error) {
    response.status(400).json({ error: 'Неверный запрос' });
  }
};

export const getBooks = async (_request: Request, response: Response) => {
  try {
    const books = await Book.find();
    response.json(books);
  } catch (error) {
    response.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const getBookById = async (request: Request, response: Response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (!book) {
      return response.status(404).json({ error: 'Книга не найдена' });
    }
    response.json(book);
  } catch (error) {
    response.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const updateBook = async (request: Request, response: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
    if (!book) {
      return response.status(404).json({ error: 'Книга не найдена' });
    }
    response.json(book);
  } catch (error) {
    response.status(400).json({ error: 'Неверный запрос' });
  }
};

export const deleteBook = async (request: Request, response: Response) => {
  try {
    const book = await Book.findByIdAndDelete(request.params.id);
    if (!book) {
      return response.status(404).json({ error: 'Книга не найдена' });
    }
    response.status(200).send("Книга удалена");
  } catch (error) {
    response.status(500).json({ error: 'Ошибка сервера' });
  }
};
