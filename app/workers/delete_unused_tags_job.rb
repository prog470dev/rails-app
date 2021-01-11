# frozen_string_literal: true

class DeleteUnusedTagsJob
  @queue = :default

  def self.perform
    unused_tags = Tag.where(tag_assignments: [])
    unused_tags.each(&:destroy!)

    path = File.expand_path('log/worker.log', Rails.root)
    File.open(path, 'a') do |f|
      f.puts 'success'
    end
  end
end
