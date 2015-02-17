Rails.application.routes.draw do
  get '/auth/github/callback' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/login', to: redirect('/auth/github')

  get '/travel' => 'towns#index'
  get '/travel/:id' => 'towns#update'
  get 'stat' => 'stats#index'

  get '/talk' => 'npcs#index'
  get '/talk/trading/:id' => 'npcs#show'
  get '/talk/buy/:id' => 'npcs#buy'
  get '/talk/sell/:id' => 'npcs#sell'
  get '/talk/requirements/:id' => 'npcs#requirements'
  get '/talk/valentines/:id' => 'npcs#valentines'

  get '/restart' => 'users#restart'
end
