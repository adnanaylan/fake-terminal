class Terminal {
    constructor() {
        this.terminal = document.getElementById('terminal')
        this.terminalBuffer = ''
        this.lineBuffer = ''
        this.commandHistory = []
        this.commandHistoryIndex = -1
        this.linePrefix = '<span class="line-prefix">guest@fake-terminal:~$ </span>'
        this.caret = '<span class="caret"></span>'

        this.commands = {
            clear: (argv, argc) => {
                this.terminalBuffer = ''
                return ''
            }
            /* Add your commands here... */
        }

        document.addEventListener('keydown', e => this.dispatch(e))
        this.renderTerminal()
    }

    renderTerminal() {
        this.terminal.innerHTML = this.terminalBuffer + this.linePrefix +  this.lineBuffer + this.caret
        this.terminal.scrollTop = this.terminal.scrollHeight
    }

    writeToTerminalBuffer(str) {
        if (!str) return ''

        this.terminalBuffer = this.terminalBuffer + str + '\n' 
    }

    processLineBuffer() {
        let argv = this.lineBuffer.split(' ')
        let argc = argv.length
        let command = argv[0]

        this.writeToTerminalBuffer(this.linePrefix + this.lineBuffer)

        if (!command) {
            return
        }

        if (command in this.commands) {
            this.commandHistory.unshift(command)
            this.writeToTerminalBuffer(this.commands[command](argv, argc))
        } else {
            this.writeToTerminalBuffer(command + ': command not found. type "help" for available commands.')
        }

        this.lineBuffer = '';
    }    


    dispatch(e) {
        e.preventDefault()
       
        if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode == 32 || e.keyCode == 189) {
            this.lineBuffer += e.key
        } else if (e.keyCode == 13) {
            this.processLineBuffer()
        } else if (e.keyCode == 8) {
            this.lineBuffer = this.lineBuffer.substr(0, this.lineBuffer.length -1)
        }

        this.renderTerminal()
    }
}