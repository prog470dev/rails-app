# frozen_string_literal: true

class Sentence < ApplicationRecord
  has_many :tag_assignments, dependent: :destroy
  has_many :tags, through: :tag_assignments
end
