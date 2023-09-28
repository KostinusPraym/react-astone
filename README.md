# ASTON VINYL MUSIC

Сделано приложение предоставляющее выбор виниловых пластинок на ваш вкус

Реализованы следующие требования к функциональности:

## 1 уровень (необходимый минимум)

### React

- Функциональные компоненты c хуками в приоритете над классовыми: [components](https://github.com/KostinusPraym/react-astone/tree/main/src/components), [pages](https://github.com/KostinusPraym/react-astone/tree/main/src/pages).
- Есть разделение на умные и глупые компоненты

  Умные: [SearchPanel](https://github.com/KostinusPraym/react-astone/blob/main/src/components/SearchPanel/SearchPanel.tsx), [Card](https://github.com/KostinusPraym/react-astone/blob/main/src/components/Card/Card.tsx), и т.д.

  Глупые: [SearchItem](https://github.com/KostinusPraym/react-astone/blob/main/src/components/SearchPanel/SearchItem/SearchItem.tsx), [FavoriteButton](https://github.com/KostinusPraym/react-astone/blob/main/src/components/FavoriteButton/FavoriteButton.tsx), и т.д.

- Есть рендеринг списков: [Form](https://github.com/KostinusPraym/react-astone/blob/main/src/pages/Home/Home.tsx), [Favorites](https://github.com/KostinusPraym/react-astone/blob/main/src/pages/Favorites/Favorites.tsx), [History](https://github.com/KostinusPraym/react-astone/blob/main/src/pages/History/History.tsx), и т.д.
- Реализована хотя бы одна форма: [Form](https://github.com/KostinusPraym/react-astone/blob/main/src/components/Form/Form.tsx).
- Есть применение Контекст API: [FeatureProvider](https://github.com/KostinusPraym/react-astone/blob/main/src/components/FeatureProvider/FeatureProvider.tsx) в [App](https://github.com/KostinusPraym/react-astone/blob/main/src/App.tsx).
- Есть применение предохранителя: [ErrorBoundary](https://github.com/KostinusPraym/react-astone/blob/main/src/components/ErrorBoundary/Fallback.tsx) в [App](https://github.com/KostinusPraym/react-astone/blob/main/src/App.tsx).
- Есть хотя бы один кастомный хук: [useDebounce](https://github.com/KostinusPraym/react-astone/blob/main/src/hooks/useDebounce.ts), [useAuth](https://github.com/KostinusPraym/react-astone/blob/main/src/hooks/useAuth.ts).
- Хотя бы несколько компонентов используют PropTypes: [Card](https://github.com/KostinusPraym/react-astone/blob/main/src/components/Card/Card.tsx), [Form](https://github.com/KostinusPraym/react-astone/blob/main/src/components/Form/Form.tsx).
- Поиск не должен триггерить много запросов к серверу: [useDebounce](https://github.com/KostinusPraym/react-astone/blob/main/src/hooks/useDebounce.ts), использован в компоненте [SearchPanel](https://github.com/KostinusPraym/react-astone/blob/main/src/components/SearchPanel/SearchPanel.tsx).
- Есть применение lazy + Suspense: [Routes](https://github.com/KostinusPraym/react-astone/blob/main/src/routes/Routes.tsx).

### Redux

- Используем Modern Redux with Redux Toolkit: [store](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/index.ts).
- Используем слайсы: [authSlice](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/slices/authSlice.ts), [searchSlice](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/slices/searchSlice.ts).
- Есть хотя бы одна кастомная мидлвара: [loger](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/middleware/loger.ts).
- Используется RTK Query: [favoritesApi](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/rtkQuery/favoritesApi.ts), [historyApi](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/rtkQuery/historyApi.ts), [vinylsApi](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/rtkQuery/vinylsApi.ts).
- Используется Transforming Responses: [favoritesApi](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/rtkQuery/favoritesApi.ts).

## 2 уровень

- Использован TypeScript.
- Использование Firebase для учетных записей пользователей и их Избранного и Истории поиска: [config](https://github.com/KostinusPraym/react-astone/blob/main/src/firebase.config.ts), применение: [auth](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/actions/authActions.ts), [favoritesApi](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/rtkQuery/favoritesApi.ts), [historyApi](https://github.com/KostinusPraym/react-astone/blob/main/src/redux/rtkQuery/historyApi.ts).
- Feature Flags. Реализована фича “Поделиться в телеграм”, закрытую под фича флагом.

  1. [x] Если флаг с этой фичей включен, то у карточки единицы информации должна появиться кнопка “Поделиться”. [ShareButton](https://github.com/KostinusPraym/react-astone/blob/main/src/components/ShareButton/ShareButton.tsx);
  2. [x] Флаг должен присылаться с локального сервера. Для этого нужно написать простой сервер, который по http-запросу на /api/feature-flags отдаст объект с флагом { isTelegramShareEnabled: true } [server](https://github.com/KostinusPraym/react-astone/tree/main/server);
  3. [x] Флаг положить в react context, забрать из контекста в необходимом месте приложения и включить фичу.[FeatureProvider](https://github.com/KostinusPraym/react-astone/blob/main/src/components/FeatureProvider/FeatureProvider.tsx).

## Дополнительно
- В проекте использовалась библиотека Tailwind CSS для стилизации компонентов.
- Для одновременного запуска клиентской и серверной частей проекта, использовалась библиотека Concurrently.

###Deploy link
[Vinyl Music](https://vinyls-store.netlify.app)
