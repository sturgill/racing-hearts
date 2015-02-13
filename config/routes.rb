Rails.application.routes.draw do
  get '/auth/github/callback' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/login', to: redirect('/auth/github')
end
