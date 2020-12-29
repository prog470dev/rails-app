Rails.application.routes.draw do
  resources :users
  resources :wps, only: %i[index]

  namespace :api do
    resources :sentences
    resources :tags
    resources :tag_assignments
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
