
const Emoji = ({ className, label, symbol }) => {
    <span className={className} role="img" aria-label={label}>
        {String.fromCodePoint(symbol)}
    </span>
}

export default Emoji