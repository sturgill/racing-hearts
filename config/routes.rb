Rails.application.routes.draw do
  get '/auth/github/callback' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/login', to: redirect('/auth/github')

  get '/travel' => 'towns#index'
  get '/travel:id' => 'towns#update'
  get 'stat' => 'stats#index'

  get '/talk' => 'npc#index'
  # get '/talk/requirements/:id'
  # get '/talk/trading/:id'
  # get '/talk/buy/:id'
  # get '/talk/sell/:id'
  # get '/talk/valentines/:id'
end
