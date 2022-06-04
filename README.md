# WAE_Projekt_Team_Grün


## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://git.oth-aw.de/6e44/wae_projekt_team_gruen.git
git branch -M main
git push -uf origin main
```


## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# socket.io
- Falls kein Ordner "node_modules" im Ordner "\sys-src\Frontend" existiert, sollte dort der Befehl:
	```
	npm install socket.io-client
	```
	ausgeführt werden.
- Falls kein Ordner "node_modules" im Ordner "\sys-src\Backend" existiert, sollte dort der Befehl:
	```
	npm install socket.io express nodemon
	```
	ausgeführt werden.

- Admin Panel:
	- Webseite: https://admin.socket.io/#/
	- Doku: https://www.npmjs.com/package/@socket.io/admin-ui
	- Server URL:
		```
		http://localhost:3001/admin
		```
	- Benutername: 
		```
		admin
		```
	- Passwort:
		```
		@;!7Uz-FkC`*rhVe8AbUZu~2i-B^X>jE
		```
	- WebSocket only setzen

# Git Commits:
- Sprache: Deutsch
- Commits sollen informativ und nicht lustig sein
- den Commit klar formulieren
- lieber öfter committen, als zu wenig
- der Ordner node_modules darf nicht mitgepusht werden!
- der Ordner .idea darf nicht mitgepusht werden!
- vor jedem Commit nochmals überprüfen, ob nicht doch Dateien oder Ordner dabei sind, die man nicht pushen möchte

# Merge:
- es wird nur über Merge request gemergt
- Nur der Reviewer führt einen Merge aus
- Man ist nie selber der Reviewer

# Kommentare:
- Sprache: Deutsch
- Über jeder Funktion muss dieser Header angebracht und aktualisiert werden:
```
	////////////////////////////////////////////
	// Kurzbeschreibung:
	// letzte Änderung: TT.MM.JJJJ - hh:mm
	///////////////////////////////////////////
```

# Header:
Über jeder Datei muss dieser Header angebracht und aktualisiert werden:
```
	/////////////////////////////////////////////
	// FileName: Filename.js
	// Autor: Vorname Nachname - Kürzel
	// Erstellt am: TT.MM.JJJJ - hh:mm
	// letzte Änderung: TT.MM.JJJJ - hh:mm
	// Beschreibung: 
	/////////////////////////////////////////////
```

# Ordner Struktur:
- Jeder ist selbst für Ordnung zuständig
- Jeder Teilbereich bekommt einen eigenen Ordner entweder in \sys-src\Backend oder \sys-src\Frontend (je nachdem wozu es gehört)
- Middleware gehört zum Backend
- Falls ein Teilbereich noch nicht angelegt wurde, ist man selbst dafür verantwortlich diesen anzulegen
- Beispiel:
```
	\sys-src
		↳Frontend
			↳Beispielordner
		↳Backend
			↳Beispielordner
```
- Sobald etwas in einen Ordner hinzugefügt wurde, soll die deleteME-Datei gelöscht werden, falls vorhanden
- Falls ein Ordner nicht gebraucht wird, soll dieser gelöscht werden

# ReadMe Datei:
- Jeder kann hier Punkte ergänzen/ändern. Dies sollte allerdings mit der Gruppe abgesprochen und deutlich erwähnt werden (außer bei Banalitäten).