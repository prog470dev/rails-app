# frozen_string_literal: true

class DeleteUnusedTagsJob
  @queue = :default

  def self.perform
    unused_tags = Tag.left_joins(:tag_assignments)
                     .where(tag_assignments: { id: nil })
    unused_tags.each(&:destroy!)

    path = File.expand_path('log/worker.log', Rails.root)
    File.open(path, 'a') do |f|
      f.puts 'success'
    end
  rescue StandardError => e
    path = File.expand_path('log/worker.log', Rails.root)
    File.open(path, 'a') do |f|
      f.puts 'failure'
      f.puts e.message
    end
  end
end
