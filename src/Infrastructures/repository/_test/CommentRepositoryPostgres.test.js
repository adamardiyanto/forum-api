const CommentsTableHelper = require('../../../../tests/CommentsTableHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('comment repositorypostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('add comment', () => {
    it('persist new comment and return added thread correctly', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'new thread',
        body: '12345',
        owner: 'user-321',
      });
      const fakeIdGenerator = () => '123';
      const newComment = new NewComment('user-321', 'thread-123', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);

      const comment = await CommentsTableHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
    });
    it('should return comment correct', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'new thread',
        body: '12345',
        owner: 'user-321',
      });
      const fakeIdGenerator = () => '123';
      const newComment = new NewComment('user-321', 'thread-123', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const addComment = await commentRepositoryPostgres.addComment(newComment);

      expect(addComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: 'comment',
        owner: 'user-321',
      }));
    });
  });

  describe('verifyusercomment', () => {
    it('error when notfound', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'new thread',
        body: '12345',
        owner: 'user-321',
      });
      const fakeIdGenerator = () => '123';
      const newComment = new NewComment('user-321', 'thread-123', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);

      await expect(commentRepositoryPostgres.verifyUserComment('user-321', 'comment-111')).rejects.toThrow(NotFoundError);
    });
    it('AuthorizationError when comment deleted by non owner', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      await UsersTableTestHelper.addUser({
        id: 'user-333', username: 'dicoding2', password: 'secret2', fullname: 'Dicoding Indonesia 2',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'new thread',
        body: '12345',
        owner: 'user-321',
      });
      const fakeIdGenerator = () => '123';
      const newComment = new NewComment('user-321', 'thread-123', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);
      await expect(commentRepositoryPostgres.verifyUserComment('user-333', 'comment-123')).rejects.toThrow(AuthorizationError);
    });
    it('not error when comment deleted by owner', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      await UsersTableTestHelper.addUser({
        id: 'user-333', username: 'dicoding2', password: 'secret2', fullname: 'Dicoding Indonesia 2',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'new thread',
        body: '12345',
        owner: 'user-321',
      });
      const fakeIdGenerator = () => '123';
      const newComment = new NewComment('user-321', 'thread-123', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);
      await expect(commentRepositoryPostgres.verifyUserComment('user-321', 'comment-123')).resolves.not.toThrow(AuthorizationError);
    });
  });
  describe('deletecomment', () => {
    it('should set is_delete to true', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-321', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia',
      });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'new thread',
        body: '12345',
        owner: 'user-321',
      });
      const fakeIdGenerator = () => '123';
      const newComment = new NewComment('user-321', 'thread-123', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);

      await commentRepositoryPostgres.deleteComment('user-321', 'thread-123', 'comment-123');
      const comments = await CommentsTableHelper.findCommentById('comment-123');

      expect(comments[0].is_delete).toBeTruthy();
    });
  });
});
