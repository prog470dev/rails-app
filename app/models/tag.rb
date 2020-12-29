class Tag < ApplicationRecord
  has_many :tag_assignments
  has_many :sentences, through: :tag_assignments

  has_one :parent, class_name: 'Tag'
end
