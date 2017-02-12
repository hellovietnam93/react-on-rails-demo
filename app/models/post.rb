class Post < ApplicationRecord
  after_commit { PostRelayJob.perform_later(self) }
end
