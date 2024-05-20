const CommentsTableHelper = require('../../../../tests/CommentsTableHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('comment repositorypostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  beforeEach(async () => {
    await UsersTableTestHelper.addUser({
      id: 'user-321', username: 'ndingg', password: 'secret', fullname: 'Dicoding Indonesia',
    });
    await ThreadsTableTestHelper.addThread({
      id: 'thread-test',
      title: 'new thread',
      body: '12345',
      owner: 'user-321',
    });
  });

  describe('addComment function', () => {
    it('persist new comment and return added thread correctly', async () => {
      const fakeIdGenerator = () => 'test';
      const newComment = new NewComment('user-321', 'thread-test', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);

      const comment = await CommentsTableHelper.findCommentById('comment-test');
      expect(comment).toHaveLength(1);
    });
    it('should return comment correctly', async () => {
      const fakeIdGenerator = () => 'test';
      const newComment = new NewComment('user-321', 'thread-test', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const addComment = await commentRepositoryPostgres.addComment(newComment);

      expect(addComment).toStrictEqual(new AddedComment({
        id: 'comment-test',
        content: 'comment',
        owner: 'user-321',
      }));
    });
  });

  describe('verifyCommentOwner function', () => {
    it('return error when not found', async () => {
      const fakeIdGenerator = () => 'test';
      const newComment = new NewComment('user-321', 'thread-test', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);

      await expect(commentRepositoryPostgres.verifyCommentOwner('user-321', 'comment-111')).rejects.toThrow(NotFoundError);
    });
    it('AuthorizationError when comment deleted by non owner', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-333', username: 'dicoding2', password: 'secret2', fullname: 'Dicoding Indonesia 2',
      });
      const fakeIdGenerator = () => 'test';
      const newComment = new NewComment('user-321', 'thread-test', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);
      await expect(commentRepositoryPostgres.verifyCommentOwner('user-333', 'comment-test')).rejects.toThrow(AuthorizationError);
    });
    it('not error when comment deleted by owner', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-333', username: 'dicoding2', password: 'secret2', fullname: 'Dicoding Indonesia 2',
      });

      const fakeIdGenerator = () => 'test';
      const newComment = new NewComment('user-321', 'thread-test', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);
      await expect(commentRepositoryPostgres.verifyCommentOwner('user-321', 'comment-test')).resolves.not.toThrow(AuthorizationError);
    });
  });
  describe('deleteComment function ', () => {
    it('should set isDelete to true', async () => {
      const fakeIdGenerator = () => 'test';
      const newComment = new NewComment('user-321', 'thread-test', 'comment');
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepositoryPostgres.addComment(newComment);

      await commentRepositoryPostgres.deleteComment('user-321', 'thread-test', 'comment-test');
      const comments = await CommentsTableHelper.findCommentById('comment-test');

      expect(comments[0].is_delete).toBeTruthy();
    });
  });
  describe('getCommentByThreadId function', () => {
    it('should return threa correctly', async () => {
      await CommentsTableHelper.addComment({
        userId: 'user-321',
        threadId: 'thread-test',
        commentId: 'comment-test',
        content: 'new comment',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      const comments = await commentRepositoryPostgres.getCommentByThreadId('thread-test');
      expect(comments[0].id).toEqual('comment-test');
      expect(comments[0].username).toEqual('ndingg');
      expect(comments[0].content).toEqual('new comment');
      expect(comments[0].isDelete).toEqual(false);
    });
  });
});
