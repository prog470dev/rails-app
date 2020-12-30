# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users
  resources :sentences, only: %i[index new edit]
  resources :tags, only: %i[new edit]

  namespace :api do
    resources :sentences
    resources :tags
    resources :tag_assignments
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
