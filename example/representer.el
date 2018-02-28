;; Example Websocket Emacs client.

(defun representer/hook ()
  (websocket-send-text wstest-ws (buffer-substring-no-properties 1 (+ 1 (buffer-size)))))

(defun representer/stop ()
  (interactive)
  (require 'websocket)
  (setq tls-checktrust nil)
  (setq wstest-ws
        (websocket-open
        "ws://localhost:8080"
        :on-open (lambda (_websocket)
                    (message "Websocket opened"))
        :on-close (lambda (_websocket)
                    (message "Websocket closed")
                    (setq wstest-closed t))))

  (defun representer/stop ()
    (interactive)
    (websocket-close wstest-ws)
    (remove-hook 'post-self-insert-hook 'representer/hook))

  (add-hook 'post-self-insert-hook 'representer/hook))

(global-set-key (kbd "s-r") 'representer/start)
(global-set-key (kbd "s-b") 'representer/stop)
