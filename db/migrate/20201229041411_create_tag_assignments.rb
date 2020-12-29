class CreateTagAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :tag_assignments do |t|
      t.belongs_to :sentence, null: false
      t.belongs_to :tag, null: false

      t.timestamps
    end
  end
end
