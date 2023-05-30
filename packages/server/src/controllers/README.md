# Forum API

Префикс: /api/v1

| Путь          | Метод  | Описание                                                                             |
| ------------- | ------ | ------------------------------------------------------------------------------------ |
| /forums       | GET    | Получить все форумы                                                                  |
| /forums/:id   | GET    | Получить форум по id (с темами)                                                      |
| /topics       | POST   | Создать новую тему: { title: string; content: string; user: string, forumId: number} |
| /topics/:id   | GET    | Получить тему по id (вместе с комментариями)                                         |
| /topics/:id   | PATCH  | Обновить тему { title: string; content: string; }                                    |
| /topics/:id   | DELETE | Удалить тему                                                                         |
| /comments/    | POST   | Создать новый комментарий: { content: string; user: string; topicId: number}         |
| /comments/:id | PATCH  | Обновить комментарий { content: string; }                                            |
| /comments/:id | DELETE | Удалить комментарий                                                                  |
