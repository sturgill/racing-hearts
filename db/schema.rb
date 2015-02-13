# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150213192958) do

  create_table "users", force: :cascade do |t|
    t.string   "email",                   limit: 255
    t.string   "uuid",                    limit: 255
    t.integer  "hearts_cents",            limit: 4,   default: 0,     null: false
    t.string   "hearts_currency",         limit: 255, default: "USD", null: false
    t.integer  "perfumes",                limit: 4,   default: 0
    t.integer  "roses",                   limit: 4,   default: 0
    t.integer  "chocolates",              limit: 4,   default: 0
    t.integer  "silks",                   limit: 4,   default: 0
    t.integer  "jewels",                  limit: 4,   default: 0
    t.string   "current_town_identifier", limit: 255
    t.string   "valentine_identifier",    limit: 255
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
    t.string   "name",                    limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
