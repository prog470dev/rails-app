class TagAssignment < ApplicationRecord
  belongs_to :sentence
  belongs_to :tag
end
