class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :uuid, unique: true, default: nil
      t.money :hearts, default: 0
      t.integer :perfumes, default: 0
      t.integer :roses, default: 0
      t.integer :chocolates, default: 0
      t.integer :silks, default: 0
      t.integer :jewels, default: 0
      t.string :current_town_identifier, default: nil
      t.string :valentine_identifier, default: nil
      t.timestamps null: false
    end
  end
end
