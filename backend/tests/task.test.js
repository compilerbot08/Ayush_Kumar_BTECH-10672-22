/*
 * Task API tests
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../src/models/User');
const Task = require('../src/models/Task');

describe('Task Endpoints', () => {
    let token;
    let userId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kanban_test');
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Task.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Task.deleteMany({});

        // create a test user and get token
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

        token = res.body.data.token;
        userId = res.body.data.user.id;
    });

    const testTask = {
        title: 'Test Task',
        description: 'Test description',
        dueDate: '2024-12-31',
        status: 'pending'
    };

    describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send(testTask);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.task.title).toBe(testTask.title);
        });

        it('should not create task without auth', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send(testTask);

            expect(res.status).toBe(401);
        });
    });

    describe('GET /api/tasks', () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send(testTask);
        });

        it('should get all tasks', async () => {
            const res = await request(app)
                .get('/api/tasks')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.data.tasks.length).toBe(1);
        });

        it('should filter tasks by status', async () => {
            const res = await request(app)
                .get('/api/tasks?status=pending')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.data.tasks[0].status).toBe('pending');
        });
    });

    describe('PATCH /api/tasks/:id/status', () => {
        let taskId;

        beforeEach(async () => {
            const res = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send(testTask);
            taskId = res.body.data.task._id;
        });

        it('should update task status', async () => {
            const res = await request(app)
                .patch(`/api/tasks/${taskId}/status`)
                .set('Authorization', `Bearer ${token}`)
                .send({ status: 'in-progress' });

            expect(res.status).toBe(200);
            expect(res.body.data.task.status).toBe('in-progress');
        });
    });

    describe('DELETE /api/tasks/:id', () => {
        let taskId;

        beforeEach(async () => {
            const res = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send(testTask);
            taskId = res.body.data.task._id;
        });

        it('should delete a task', async () => {
            const res = await request(app)
                .delete(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});
